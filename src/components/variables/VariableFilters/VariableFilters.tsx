import styles from "./VariableFilters.module.css";

type VariableFiltersProps = {
  search: string;
  onSearchChange: (next: string) => void;
  selectedGroup: string;
  onGroupChange: (next: string) => void;
  groups: string[];
};

export function VariableFilters({
  search,
  onSearchChange,
  selectedGroup,
  onGroupChange,
  groups,
}: VariableFiltersProps) {
  return (
    <div className={styles.bar}>
      <input
        type="search"
        className={styles.search}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by Name"
        aria-label="Search variables by name"
      />

      <div className={styles.filters}>
        <label className={styles.filterLabel}>
          <select
            className={styles.select}
            value={selectedGroup}
            onChange={(event) => onGroupChange(event.target.value)}
          >
            <option value="all">All groups</option>
            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
