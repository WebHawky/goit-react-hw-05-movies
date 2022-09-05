import s from './SearchBar.module.css';
import PropTypes from 'prop-types';

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={s.form_container}>
      <button type="submit" className={s.btn}>
        SEARCH
      </button>
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </form>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};
