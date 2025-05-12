
import { useEffect, useRef } from "react";
import { useProposalStore } from "@/store/proposalStore";
import { FileText } from "lucide-react"; // Changed from FilePdf to FileText which is available

const ProposalPreview = () => {
  const { title, company, messages } = useProposalStore();
  const previewRef = useRef<HTMLDivElement>(null);

  // Generate content based on the conversation
  const generateContent = () => {
    if (messages.length === 0) return null;
    
    // Extract the latest assistant response
    const lastAssistantMessage = [...messages]
      .reverse()
      .find(msg => msg.role === "assistant");
    
    if (!lastAssistantMessage) return null;

    return (
      <>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{title || "Project Proposal"}</h1>
          <p className="text-lg text-gray-600">Prepared by {company || "Your Company"}</p>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-700 border-b pb-2">Executive Summary</h2>
            <p className="text-gray-700">
              This proposal outlines our approach to delivering high-quality solutions tailored to your specific needs.
              Based on our understanding of your requirements, we've developed a comprehensive plan to ensure success.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-700 border-b pb-2">Project Scope</h2>
            <p className="text-gray-700 mb-3">
              Our team will work closely with you to deliver the following:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Initial consultation and requirements gathering</li>
              <li>Custom development based on specified needs</li>
              <li>Regular progress updates and milestone reviews</li>
              <li>Thorough testing and quality assurance</li>
              <li>Final delivery with comprehensive documentation</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-700 border-b pb-2">Timeline & Milestones</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Project Kickoff</span>
                <span className="text-gray-600">Week 1</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Design Phase</span>
                <span className="text-gray-600">Weeks 2-3</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Development</span>
                <span className="text-gray-600">Weeks 4-7</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Testing & QA</span>
                <span className="text-gray-600">Week 8</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Delivery</span>
                <span className="text-gray-600">Week 9</span>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-700 border-b pb-2">Investment</h2>
            <p className="text-gray-700 mb-3">
              Our pricing is structured to provide maximum value while maintaining the highest standards of quality.
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Item</th>
                  <th className="border p-2 text-right">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Discovery & Planning</td>
                  <td className="border p-2 text-right">$X,XXX</td>
                </tr>
                <tr>
                  <td className="border p-2">Development</td>
                  <td className="border p-2 text-right">$XX,XXX</td>
                </tr>
                <tr>
                  <td className="border p-2">Testing & QA</td>
                  <td className="border p-2 text-right">$X,XXX</td>
                </tr>
                <tr className="font-semibold">
                  <td className="border p-2">Total Investment</td>
                  <td className="border p-2 text-right">$XX,XXX</td>
                </tr>
              </tbody>
            </table>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-700 border-b pb-2">Next Steps</h2>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              <li>Review this proposal and provide feedback</li>
              <li>Schedule a follow-up call to discuss details</li>
              <li>Sign agreement and submit initial payment</li>
              <li>Begin project kickoff process</li>
            </ol>
          </section>
          
          <section className="mt-10">
            <div className="border-t pt-4">
              <p className="text-center text-gray-600">
                We look forward to working with you to bring this project to life.
              </p>
              <p className="text-center font-semibold mt-2">
                {company || "Your Company"}
              </p>
            </div>
          </section>
        </div>
      </>
    );
  };

  return (
    <div 
      ref={previewRef}
      className="preview-container p-8 min-h-full bg-white"
      style={{ maxWidth: "8.5in", margin: "0 auto" }}
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <FileText className="h-12 w-12 mb-4 opacity-20" /> 
          <p className="text-center">
            Your proposal preview will appear here.<br />
            Start a conversation to generate content.
          </p>
        </div>
      ) : (
        generateContent()
      )}
    </div>
  );
};

export default ProposalPreview;
