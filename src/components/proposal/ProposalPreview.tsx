
import { useEffect, useRef } from "react";
import { useProposalStore } from "@/store/proposalStore";
import { FileText, CheckCircle, Calendar, DollarSign, ArrowRight } from "lucide-react"; // Added more icons

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
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{title || "Project Proposal"}</h1>
          <p className="text-lg text-gray-600">Prepared by {company || "Your Company"}</p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2 flex items-center">
              <div className="p-1.5 bg-blue-100 rounded-full mr-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This proposal outlines our approach to delivering high-quality solutions tailored to your specific needs.
              Based on our understanding of your requirements, we've developed a comprehensive plan to ensure success.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2 flex items-center">
              <div className="p-1.5 bg-blue-100 rounded-full mr-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
              Project Scope
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our team will work closely with you to deliver the following:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <ul className="list-none space-y-3">
                {["Initial consultation and requirements gathering", 
                  "Custom development based on specified needs", 
                  "Regular progress updates and milestone reviews", 
                  "Thorough testing and quality assurance", 
                  "Final delivery with comprehensive documentation"].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2 flex items-center">
              <div className="p-1.5 bg-blue-100 rounded-full mr-2">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              Timeline & Milestones
            </h2>
            <div className="space-y-3">
              {[
                ["Project Kickoff", "Week 1"],
                ["Design Phase", "Weeks 2-3"],
                ["Development", "Weeks 4-7"],
                ["Testing & QA", "Week 8"],
                ["Delivery", "Week 9"]
              ].map(([phase, time], i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <span className="font-medium text-gray-800 flex items-center">
                    <div className={`w-6 h-6 rounded-full ${i === 4 ? 'bg-green-500' : 'bg-blue-500'} text-white flex items-center justify-center mr-2`}>
                      {i + 1}
                    </div>
                    {phase}
                  </span>
                  <span className="text-gray-600 bg-white px-3 py-1 rounded-full text-sm border border-gray-200">{time}</span>
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2 flex items-center">
              <div className="p-1.5 bg-blue-100 rounded-full mr-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
              Investment
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our pricing is structured to provide maximum value while maintaining the highest standards of quality.
            </p>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border-b border-gray-200 p-3 text-left">Item</th>
                    <th className="border-b border-gray-200 p-3 text-right">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Discovery & Planning", "$X,XXX"],
                    ["Development", "$XX,XXX"],
                    ["Testing & QA", "$X,XXX"],
                  ].map(([item, cost], i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border-b border-gray-200 p-3">{item}</td>
                      <td className="border-b border-gray-200 p-3 text-right">{cost}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold bg-gray-50">
                    <td className="p-3">Total Investment</td>
                    <td className="p-3 text-right text-blue-700">$XX,XXX</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2 flex items-center">
              <div className="p-1.5 bg-blue-100 rounded-full mr-2">
                <ArrowRight className="h-4 w-4 text-blue-600" />
              </div>
              Next Steps
            </h2>
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Review this proposal and provide feedback</li>
                <li>Schedule a follow-up call to discuss details</li>
                <li>Sign agreement and submit initial payment</li>
                <li>Begin project kickoff process</li>
              </ol>
            </div>
          </section>
          
          <section className="mt-12">
            <div className="border-t pt-6">
              <div className="max-w-xs mx-auto">
                <div className="flex justify-center mb-4">
                  {company ? (
                    <img 
                      src="/placeholder.svg" 
                      alt={company} 
                      className="h-12 w-auto"
                    />
                  ) : (
                    <div className="h-12 w-40 bg-gray-200 rounded animate-pulse"></div>
                  )}
                </div>
                <p className="text-center text-gray-600">
                  We look forward to working with you to bring this project to life.
                </p>
                <p className="text-center font-semibold mt-2">
                  {company || "Your Company"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  };

  return (
    <div 
      ref={previewRef}
      className="preview-container p-10 min-h-full bg-white rounded-lg shadow-inner"
      style={{ maxWidth: "8.5in", margin: "0 auto" }}
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <FileText className="h-12 w-12 opacity-50 text-blue-500" /> 
          </div>
          <h3 className="text-xl font-medium mb-2 text-gray-600">Your proposal preview will appear here</h3>
          <p className="text-center text-gray-500 max-w-md">
            Start a conversation with our AI assistant to generate a professional proposal tailored to your needs.
          </p>
        </div>
      ) : (
        generateContent()
      )}
    </div>
  );
};

export default ProposalPreview;
