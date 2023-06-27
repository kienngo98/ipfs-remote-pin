import { PINNING_SERVICES } from "@/const";
import { useState } from "react";
import RemovePinProvider from "./RemotePinContext";

export default function ServiceProvider() {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const selectedService = PINNING_SERVICES[selectedIndex];
  return (
    <>
      <div className="max-w-md mx-auto px-1 text-3xl mt-6 text-center lg:w-[620px] md:w-[620px]">
        A unified interface for pinning CIDs to remote pinning services
      </div>
      <div className="max-w-md mx-auto my-4 p-4 bg-white rounded shadow lg:w-[620px] md:w-[620px]">
        <div className="mb-4">
          <label
            htmlFor="pinningService"
            className="block text-gray-700 font-semibold mb-1"
          >
            Select Pinning Service
          </label>
          <select
            id="pinningService"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={(e) => {
              const val = Number(e.target.value);
              if (isNaN(val) || val < 0) return;
              setSelectedIndex(val);
            }}
          >
            <option value="">Select a service</option>
            {PINNING_SERVICES.map((item, index) => (
              <option
                key={item.name}
                value={index}
                style={{ display: item.ready ? "" : "none" }}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {selectedService && (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                {selectedService.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {selectedService.name} is a decentralized file storage service
                powered by IPFS. Use the form below to remotely pin CIDs to{" "}
                {selectedService.name}.
              </p>
              <p className="text-gray-600 mb-4">
                For more information, please visit{" "}
                <a
                  href={selectedService.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {selectedService.website.replace(/^https?:\/\//, "")}
                </a>
                .
              </p>
            </div>
            <RemovePinProvider service={selectedService}></RemovePinProvider>
          </>
        )}
      </div>
    </>
  );
}
