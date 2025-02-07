import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useWallet } from "@suiet/wallet-kit";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { handleSuiPayment } from "../utils/suiTransfer";

function AgentPage() {
  const { signAndExecuteTransactionBlock, connected, account } = useWallet();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    twitter: "",
    website: "",
    description: "",
    profilePicture: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!account?.address) {
      navigate("/");
    }
  }, [account?.address, navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }

      setFormData({ ...formData, profilePicture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!connected || !account) {
      toast.error("Please connect your wallet first!");
      return;
    }

    if (!signAndExecuteTransactionBlock) {
      toast.error("Wallet connection not initialized properly");
      return;
    }

    if (!formData.name || !formData.twitter || !formData.description) {
      toast.error("Please fill in all required fields (Name, Twitter, Description)");
      return;
    }

    setLoading(true);

    try {
      // First show payment confirmation toast
      const confirmPayment = await toast.promise(
        new Promise((resolve, reject) => {
          toast((t) => (
            <div>
              <p>Please confirm payment of 1 SUI to submit proposal</p>
              <div className="mt-2">
                <button
                  className="mr-2 px-3 py-1 bg-primary text-white rounded"
                  onClick={() => {
                    toast.dismiss(t.id);
                    resolve(true);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="px-3 py-1 bg-gray-500 text-white rounded"
                  onClick={() => {
                    toast.dismiss(t.id);
                    reject(new Error("Payment cancelled"));
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ), { duration: Infinity });
        }
      ), {
        loading: 'Awaiting confirmation...',
        success: 'Payment confirmed!',
        error: 'Payment cancelled'
      });

      if (!confirmPayment) return;

      // Handle SUI payment
      const paymentToastId = toast.loading("Processing payment...");
      
      const paymentResult = await handleSuiPayment(signAndExecuteTransactionBlock);
      
      if (paymentResult.status === "success") {
        toast.success("Payment successful!", { id: paymentToastId });

        // Submit the proposal
        const submitToastId = toast.loading("Submitting proposal...");
        
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('twitter', formData.twitter);
        submitData.append('website', formData.website);
        submitData.append('description', formData.description);
        submitData.append('creator_wallet', account.address);
        submitData.append('payment_tx', paymentResult.digest);
        if (formData.profilePicture) {
          submitData.append('profilePicture', formData.profilePicture);
        }

        const response = await axios.post(`${BACKEND_URL}/api/proposals`, submitData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        toast.success("Proposal submitted successfully!", { id: submitToastId });
        
        // Reset form
        setFormData({
          name: "",
          twitter: "",
          website: "",
          description: "",
          profilePicture: null
        });
        setPreviewUrl(null);
        
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.message?.includes("Payment cancelled")) {
        toast.error("Payment cancelled by user");
      } else if (error.message?.includes("User rejected")) {
        toast.error("Transaction rejected by user");
      } else if (error.message?.includes("Insufficient")) {
        toast.error("Insufficient SUI balance");
      } else {
        toast.error(error.message || "Transaction failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container my-10">
        <form onSubmit={handleSubmit} className="w-[90%] mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">Agent Details:</h2>
            <div className="flex gap-10 items-end mb-6">
              <div className="mb-6 min-w-[150px]">
                <p className="mb-2 w-full">Profile Picture:</p>
                <label className="w-24 h-24 bg-white rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {previewUrl ? (
                    <img src={previewUrl} className="w-full h-full object-cover" alt="Profile preview" />
                  ) : (
                    <img src="/icon/upload.png" className="w-8 h-8 text-gray-400" alt="Upload icon" />
                  )}
                </label>
              </div>
              <div className="w-full">
                <label className="block mb-1">AI Agent Name:</label>
                <input
                  required
                  type="text"
                  placeholder="Enter AI Agent Name Here"
                  className="w-full px-3 py-2 bg-[#191919] border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Twitter Handle</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter Twitter URL"
                    className="w-full px-3 py-2 bg-[#191919] border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-1">Website (optional)</label>
                  <input
                    type="text"
                    placeholder="Enter Website URL"
                    className="w-full px-3 py-2 bg-[#191919] border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">AI Agent Description</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Enter AI Agent Description"
                  className="w-full px-3 py-2 bg-[#191919] border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || !connected}
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Submit Proposal (1 SUI)"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default AgentPage;