import React from 'react';
import { useContestStore } from '../store/contestStore';
import { Category, Heat } from '../types';
import { getParticipantById, getParticipantFullName } from '../utils/participant';

export function Display() {
  const { heats, participants } = useContestStore();

  const heatsByCategory = heats.reduce((acc, heat) => {
    if (!acc[heat.category]) {
      acc[heat.category] = [];
    }
    acc[heat.category].push(heat);
    return acc;
  }, {} as Record<Category, Heat[]>);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Display</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(heatsByCategory).map(([category, categoryHeats]) => (
          <div key={category} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-secondary px-4 py-3">
              <h2 className="text-lg font-semibold text-white">
                {category}
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {categoryHeats.map((heat, heatIndex) => (
                <div key={heat.id} className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Round {heat.round} - Heat {heatIndex + 1}
                  </h3>
                  <div className="space-y-3">
                    {heat.participants.map(participantId => {
                      const participant = getParticipantById(participants, participantId);
                      if (!participant) return null;

                      return (
                        <div key={participantId} className="p-2 rounded bg-background hover:bg-gray-100 transition-colors">
                          <div className="text-sm font-medium text-primary">
                            {getParticipantFullName(participant)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}