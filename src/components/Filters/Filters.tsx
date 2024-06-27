import FilterButton from './FilterButton';
import { TODO_FILTERS } from './constants';

export type TODO_FILTER = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];

type Props = {
  selectedFilter: TODO_FILTER;
  onFilterChange: (filter: TODO_FILTER) => void;
};

const Filters = ({ selectedFilter, onFilterChange }: Props) => {
  return (
    <ul className="filters">
      {Object.values(TODO_FILTERS).map((filter) => (
        <li key={filter.value}>
          <FilterButton
            filter={filter}
            label={filter.label}
            onFilterChange={onFilterChange}
            selected={selectedFilter.value === filter.value}
            // href={`?filter=${filter.value}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default Filters;
