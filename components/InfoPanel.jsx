import React from 'react';

const InfoPanel = ({ node }) => {
  if (!node) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <span className="text-2xl font-semibold mb-2">Select an event</span>
        <span className="text-base">Click a node to see details</span>
      </div>
    );
  }
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-900">{node.label}</h2>
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <span className="bg-slate-200 rounded px-2 py-0.5">{node.year}</span>
        <span className="bg-slate-100 rounded px-2 py-0.5">{node.category}</span>
        <span className="bg-slate-100 rounded px-2 py-0.5">Value: {node.value}</span>
      </div>
      <p className="text-slate-800 text-base whitespace-pre-line">{node.description}</p>
      {node.causes?.length > 0 && (
        <div>
          <div className="font-semibold text-slate-700 mb-1">Causes:</div>
          <ul className="list-disc list-inside text-slate-700">
            {node.causes.map((cause, i) => (
              <li key={i}>{cause}</li>
            ))}
          </ul>
        </div>
      )}
      {node.sources?.length > 0 && (
        <div>
          <div className="font-semibold text-slate-700 mb-1">Sources:</div>
          <ul className="list-disc list-inside text-blue-700">
            {node.sources.map((src, i) => (
              <li key={i}><a href={src} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">{src}</a></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InfoPanel; 