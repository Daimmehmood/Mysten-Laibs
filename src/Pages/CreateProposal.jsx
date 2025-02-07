import React, { useState } from "react";
import Layout from "../components/Layout";
import { useWallet } from "@suiet/wallet-kit";
// import { TransactionBlock } from "@mysten/sui.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../config";
import useStore from "../store";

function CreateProposal() {
  const { account, connected } = useWallet();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!connected || !account) {
      toast.error("Please connect your wallet first!");
      return;
    }

    try {
      setLoading(true);
      const toastId = toast.loading("Creating proposal...");

      // Submit to backend
      const response = await axios.post(`${BACKEND_URL}/api/proposals`, {
        ...formData,
        creator: account.address
      });

      toast.success("Proposal created successfully!", { id: toastId });
      navigate("/vote");
    } catch (error) {
      console.error('Error creating proposal:', error);
      toast.error(error.response?.data?.error || "Failed to create proposal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Proposal</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !connected}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              (loading || !connected) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create Proposal'}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default CreateProposal;
