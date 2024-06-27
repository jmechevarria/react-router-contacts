import { TODO_FILTER } from './Filters';

type Props = {
  label: string;
  filter: TODO_FILTER;
  selected: boolean;
  onFilterChange: (filter: TODO_FILTER) => void;
  //   href: string
};

const FilterButton = ({
  label,
  filter,
  selected,
  onFilterChange,
  //   href,
}: Props) => {
  return (
    <a
      //   href={href}
      className={selected ? 'selected' : ''}
      onClick={(e) => {
        e.preventDefault();
        onFilterChange(filter);
      }}
    >
      {label}
    </a>
  );
};

export default FilterButton;
