import type { PropertyFilters } from "../api/propertyApi";

interface FilterBarProps {
  filters: PropertyFilters;
  setFilters: React.Dispatch<React.SetStateAction<PropertyFilters>>;
  onSearch: () => void;
  onReset: () => void;
}

const FilterBar = ({ filters, setFilters, onSearch, onReset }: FilterBarProps) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-5">
        <input
          type="text"
          placeholder="Location"
          value={filters.location || ""}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
          className="rounded-lg border px-4 py-2"
        />

        <input
          type="number"
          placeholder="Min price"
          value={filters.minPrice || ""}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: e.target.value })
          }
          className="rounded-lg border px-4 py-2"
        />

        <input
          type="number"
          placeholder="Max price"
          value={filters.maxPrice || ""}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
          className="rounded-lg border px-4 py-2"
        />

        <select
          value={filters.propertyType || ""}
          onChange={(e) =>
            setFilters({ ...filters, propertyType: e.target.value })
          }
          className="rounded-lg border px-4 py-2"
        >
          <option value="">Property Type</option>
          <option value="APARTMENT">Apartment</option>
          <option value="STUDIO">Studio</option>
          <option value="DUPLEX">Duplex</option>
          <option value="BUNGALOW">Bungalow</option>
          <option value="SELF_CONTAIN">Self Contain</option>
          <option value="COMMERCIAL">Commercial</option>
        </select>

        <select
          value={filters.bedrooms || ""}
          onChange={(e) =>
            setFilters({ ...filters, bedrooms: e.target.value })
          }
          className="rounded-lg border px-4 py-2"
        >
          <option value="">Bedrooms</option>
          <option value="1">1 bedroom</option>
          <option value="2">2 bedrooms</option>
          <option value="3">3 bedrooms</option>
          <option value="4">4 bedrooms</option>
          <option value="5">5 bedrooms</option>
        </select>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={onSearch}
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          Search
        </button>

        <button
          onClick={onReset}
          className="rounded-lg border px-5 py-2 text-gray-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;