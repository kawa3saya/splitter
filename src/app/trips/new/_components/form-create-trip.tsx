"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTrip } from "@/app/trips/new/_actions/create-trip";
import { CURRENCIES } from "@/constants/currencies";

export function FormCreateTrip() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [baseCurrency, setBaseCurrency] = useState<string>("");
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [memberNames, setMemberNames] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddMember = () => {
    setMemberNames([...memberNames, ""]);
  };

  const handleRemoveMember = (index: number) => {
    if (memberNames.length > 1) {
      setMemberNames(memberNames.filter((_, i) => i !== index));
    }
  };

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...memberNames];
    newMembers[index] = value;
    setMemberNames(newMembers);
  };

  const handleCurrencyChange = (code: string) => {
    if (currencies.includes(code)) {
      setCurrencies(currencies.filter((c) => c !== code));
    } else {
      setCurrencies([...currencies, code]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (
        !title ||
        !baseCurrency ||
        !memberNames ||
        memberNames.length === 0 ||
        !currencies ||
        currencies.length == 0
      ) {
        throw new Error("Invalid form data");
      }

      const result = await createTrip({
        title: title.trim(),
        base_currency: baseCurrency,
        member_names: memberNames,
        currencies: currencies,
      });

      router.replace(`/trips/${result.trip.id}/share`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Trip</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Trip Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter trip title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Base Currency
          </label>
          <select
            value={baseCurrency ?? ""}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a base currency</option>
            {Object.entries(CURRENCIES)
              .filter(([, name]) => name !== "")
              .map(([code, name]) => (
                <option key={code} value={code}>
                  {code.toUpperCase()} - {name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Currencies</label>
          <div className="space-y-2">
            {Object.entries(CURRENCIES)
              .filter(([, name]) => name !== "")
              .map(([code, name]) => (
                <div key={code} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={code}
                    onChange={() => handleCurrencyChange(code)}
                    checked={currencies.includes(code)}
                  />
                  {code.toUpperCase()} - {name}
                </div>
              ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Trip Members</label>
          <div className="space-y-2">
            {memberNames.map((name, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter member name"
                />
                {memberNames.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddMember}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Member
          </button>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Trip"}
          </button>
        </div>
      </form>
    </div>
  );
}
