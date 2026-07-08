"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  UserCircleIcon, 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

export default function ProfileView() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-sm border border-[#E5E7EB]">
              <div className="h-full w-full rounded-xl bg-[#4F46E5] text-white flex items-center justify-center text-3xl font-extrabold">
                SV
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[13px] font-semibold text-[#374151] hover:bg-[#F9FAFB] transition shadow-sm">
              Edit Profile
            </button>
          </div>
          
          <div>
            <h1 className="text-2xl font-extrabold text-[#111827]">Secretary Verma</h1>
            <p className="text-[15px] font-medium text-[#6B7280] mt-1">Member of Legislative Assembly (MLA) · Rampur West</p>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-[14px] text-[#4B5563]">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-[#9CA3AF]" />
              <span>Rampur West, Constituency 42</span>
            </div>
            <div className="flex items-center gap-2">
              <BuildingOfficeIcon className="h-5 w-5 text-[#9CA3AF]" />
              <span>State Assembly, Block B</span>
            </div>
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5 text-[#9CA3AF]" />
              <span>s.verma@assembly.gov.in</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-[#9CA3AF]" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Term Information */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6"
        >
          <h2 className="text-[16px] font-bold text-[#111827] mb-5 flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5 text-[#4F46E5]" />
            Term Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">Current Term</p>
              <p className="text-[14px] font-medium text-[#111827]">2022 – 2027</p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">Party Affiliation</p>
              <p className="text-[14px] font-medium text-[#111827]">Independent Progress Party</p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">Committee Memberships</p>
              <ul className="list-disc list-inside text-[14px] font-medium text-[#111827] space-y-1">
                <li>Urban Development Committee</li>
                <li>Public Accounts Committee</li>
                <li>IT & Innovation Board</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6"
        >
          <h2 className="text-[16px] font-bold text-[#111827] mb-5 flex items-center gap-2">
            <ChartBarIcon className="h-5 w-5 text-[#4F46E5]" />
            Constituency Impact
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
              <p className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">Total Complaints Resolved</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#111827]">12,482</span>
                <span className="text-[12px] font-bold text-emerald-600">↑ 14% YTD</span>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
              <p className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">Avg. Resolution Time</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#111827]">4.2 days</span>
                <span className="text-[12px] font-bold text-emerald-600">↓ 1.5 days</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
              <p className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">Projects Completed</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#111827]">45</span>
                <span className="text-[12px] font-bold text-[#6B7280]">in current term</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
              <p className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">Citizen Satisfaction</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#111827]">87%</span>
                <span className="text-[12px] font-bold text-emerald-600">↑ 4% this month</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
            <h3 className="text-[14px] font-bold text-[#111827] mb-3">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                <div>
                  <p className="text-[13px] font-medium text-[#111827]">Approved Sector 7B Water Supply Phase 2</p>
                  <p className="text-[12px] text-[#6B7280] mt-0.5">2 days ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-[#4F46E5] flex-shrink-0"></div>
                <div>
                  <p className="text-[13px] font-medium text-[#111827]">Held Townhall Meeting in Ward 4</p>
                  <p className="text-[12px] text-[#6B7280] mt-0.5">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
