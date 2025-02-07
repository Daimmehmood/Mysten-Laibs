import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useWallet } from "@suiet/wallet-kit";
// import { TransactionBlock } from "@mysten/sui.js";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../config";
import useStore from "../store";
// import { PACKAGE_ID } from "../sui-config";

function VotePage() {
  const { account, connected, signAndExecuteTransactionBlock } = useWallet();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [votingStatus, setVotingStatus] = useState({});

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/proposals`);
      console.log('Fetched proposals:', response.data);
      if (Array.isArray(response.data)) {
        setProposals(response.data);
      } else {
        console.error('Invalid response format:', response.data);
        toast.error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error fetching proposals:', error);
      toast.error(
        error.response?.data?.error || 
        error.message || 
        "Failed to fetch proposals"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (proposalId) => {
    if (!connected || !account) {
      toast.error("Please connect your wallet first!");
      return;
    }

    try {
      setVotingStatus(prev => ({ ...prev, [proposalId]: true }));
      const response = await axios.post(`${BACKEND_URL}/api/proposals/${proposalId}/vote`, {
        wallet: account.address
      });

      if (response.data) {
        toast.success("Vote recorded successfully!");
        fetchProposals(); // Refresh the proposals list
      }
    } catch (error) {
      console.error('Voting error:', error);
      toast.error(error.response?.data?.error || "Failed to record vote");
    } finally {
      setVotingStatus(prev => ({ ...prev, [proposalId]: false }));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">AI Agents</h1>
          <Link
            to="/agent"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
          >
            Create Agent
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading proposals...</div>
        ) : proposals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((proposal) => (
              <div
                key={proposal._id}
                className="bg-[#191919] rounded-lg overflow-hidden border border-primary"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    {proposal.profilePicture ? (
                      <img
                        src={proposal.profilePicture.url}
                        alt={proposal.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-2xl text-gray-400">
                          {proposal.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{proposal.name}</h3>
                      <div className="flex gap-3">
                        {proposal.twitter && (
                          <a
                            href={proposal.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Twitter
                          </a>
                        )}
                        {proposal.website && (
                          <a
                            href={proposal.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{proposal.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      Votes: {proposal.votes.length}
                    </div>
                    <button
                      onClick={() => handleVote(proposal._id)}
                      disabled={
                        votingStatus[proposal._id] ||
                        !connected ||
                        proposal.votes.some((vote) => vote.wallet === account?.address)
                      }
                      className={`px-4 py-2 rounded ${
                        proposal.votes.some((vote) => vote.wallet === account?.address)
                          ? "bg-green-600 cursor-not-allowed"
                          : "bg-pink-600 hover:bg-pink-700"
                      } text-white transition-colors ${
                        (!connected || votingStatus[proposal._id]) && "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {proposal.votes.some((vote) => vote.wallet === account?.address)
                        ? "Voted"
                        : votingStatus[proposal._id]
                        ? "Voting..."
                        : "Vote"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">No proposals found</div>
        )}
      </div>
    </Layout>
  );
}

export default VotePage;
