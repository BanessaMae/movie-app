import React from 'react';

const SearchTerm = React.memo((props) => {
  return (
    <div className="search">
      <form className="ant-form" action="" onSubmit={(e) => props.onHandleSubmit(e)}>
        <input
          className="ant-input"
          placeholder="Type to search..."
          type="search"
          name="query"
          onChange={(e) => {
            props.onHandleChange(e);
            props.onHandleSubmit(e);
          }}
          autoFocus
        />
      </form>
    </div>
  );
});
SearchTerm.displayName = 'SearchTerm';
export default SearchTerm;
