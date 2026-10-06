import React, { useState } from 'react';
import {
  Share2,
  CheckCircle2,
  Youtube,
  Send,
  Plus,
  ShieldCheck,
  Clock,
  Radio,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { ConnectedChannel } from '../types';

interface SocialConnectorsProps {
  channels: ConnectedChannel[];
  onToggleAutoPublish: (channelId: string) => void;
  onConnectChannel: (platform: string, handle: string, name: string) => void;
}

export const SocialConnectors: React.FC<SocialConnectorsProps> = ({
  channels,
  onToggleAutoPublish,
  onConnectChannel,
}) => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [targetPlatform, setTargetPlatform] = useState('youtube');
  const [channelHandle, setChannelHandle] = useState('');
  const [channelName, setChannelName] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
              <Share2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">
              Social Platform Connectors &amp; Accounts
            </h2>
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
              {channels.length} Connected
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Authorize your YouTube Shorts and TikTok accounts. The automated engine publishes scheduled videos, adds SEO keywords, and monitors analytics automatically.
          </p>
        </div>

        <button
          onClick={() => setShowConnectModal(true)}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Account</span>
        </button>
      </div>

      {/* Connected Accounts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {channels.map((ch) => {
          const isYouTube = ch.platform === 'youtube';
          const isTikTok = ch.platform === 'tiktok';
          const isInstagram = ch.platform === 'instagram';

          return (
            <div
              key={ch.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-xl space-y-4"
            >
              {/* Card Header with Avatar and Platform Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={ch.avatar}
                    alt={ch.name}
                    className="w-11 h-11 rounded-xl object-cover border-2 border-slate-700"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {ch.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    </h3>
                    <span className="text-xs text-slate-400">{ch.handle}</span>
                  </div>
                </div>

                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${
                    isYouTube
                      ? 'bg-red-600'
                      : isTikTok
                      ? 'bg-black border border-cyan-400 text-cyan-400'
                      : isInstagram
                      ? 'bg-gradient-to-tr from-fuchsia-600 to-pink-500'
                      : 'bg-slate-800'
                  }`}
                >
                  {isYouTube ? (
                    <Youtube className="w-4 h-4" />
                  ) : isTikTok ? (
                    <Send className="w-4 h-4" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </div>
              </div>

              {/* Channel Stats */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase font-semibold">
                    Followers / Subs
                  </span>
                  <span className="text-white font-bold text-sm">{ch.subscribers}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase font-semibold">
                    Optimal Peak Time
                  </span>
                  <span className="text-purple-300 font-mono font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {ch.bestTime}
                  </span>
                </div>
              </div>

              {/* Permissions & Security Badge */}
              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified OAuth 2.0 Token Active</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Permissions: Direct Video Upload, Public Visibility, SEO Tags
                </div>
              </div>

              {/* Auto-Publish Toggle Switch */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white block">Daily Auto-Publish</span>
                  <span className="text-[10px] text-slate-400">
                    Include in Autopilot queue
                  </span>
                </div>
                <button
                  onClick={() => onToggleAutoPublish(ch.id)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    ch.autoPublish ? 'bg-purple-600' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                      ch.autoPublish ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connect Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl">
            <h3 className="text-base font-bold">Connect New Social Platform</h3>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Platform</label>
              <select
                value={targetPlatform}
                onChange={(e) => setTargetPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              >
                <option value="youtube">YouTube Shorts (YouTube Studio)</option>
                <option value="tiktok">TikTok Creator Account</option>
                <option value="instagram">Instagram Reels</option>
                <option value="x">X (Twitter)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Channel / Profile Name</label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="E.g. Daily Tech Secrets"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Handle / Username</label>
              <input
                type="text"
                value={channelHandle}
                onChange={(e) => setChannelHandle(e.target.value)}
                placeholder="E.g. @dailytechsecrets"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-800/40 text-xs text-purple-200 flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                Simulated OAuth verification securely grants automated posting rights.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConnectModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (channelHandle.trim()) {
                    onConnectChannel(
                      targetPlatform,
                      channelHandle.startsWith('@') ? channelHandle : `@${channelHandle}`,
                      channelName || `${targetPlatform.toUpperCase()} Channel`
                    );
                    setShowConnectModal(false);
                    setChannelHandle('');
                    setChannelName('');
                  }
                }}
                className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-red-600 via-purple-600 to-cyan-500 text-white rounded-xl shadow"
              >
                Connect &amp; Authorize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
