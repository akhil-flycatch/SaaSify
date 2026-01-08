
import React from 'react';
import { TRAFFIC_SOURCES } from '../constants';

const TrafficSources: React.FC = () => {
  return (
    <div className="p-6 rounded-xl bg-card-dark border border-border-dark shadow-sm flex flex-col">
      <h3 className="text-lg font-bold text-white mb-1">Traffic Sources</h3>
      <p className="text-sm text-text-secondary mb-6">Where your users are coming from</p>
      
      <div className="flex-1 flex flex-col justify-center gap-6">
        {TRAFFIC_SOURCES.map((source) => (
          <div key={source.name} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-white flex items-center gap-2">
                <span className={`size-2 rounded-full ${source.color.replace('bg-', 'bg-')}`}></span> 
                {source.name}
              </span>
              <span className="text-text-secondary">{source.percentage}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${source.color}`} 
                style={{ width: `${source.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-white/5">
        <button className="w-full py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary/20">
          View Full Report
        </button>
      </div>
    </div>
  );
};

export default TrafficSources;
