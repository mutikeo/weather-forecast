// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import debounce from 'lodash/debounce';
import noop from 'lodash/noop';

function AutoComplete({
  onChange,
  onSelect,
  onReset,
  label,
  options,
  isLoading,
}) {
  const [open, setOpen] = useState(false);
  const loading = open && isLoading;

  return (
    <Autocomplete
      id="autocomplete-component"
      disableClearable
      style={{ width: 500 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        onReset();
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.woeid === value.woeid}
      getOptionLabel={option => option.title}
      options={options}
      loading={loading}
      onInputChange={debounce((event, newInputValue) => {
        onChange(newInputValue);
      }, 800)}
      onChange={(event, newValue) => {
        onSelect(newValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

const { bool, any, func, string } = PropTypes;

AutoComplete.propTypes = {
  onChange: func,
  onSelect: func,
  onReset: func,
  label: string,
  options: any,
  isLoading: bool,
};

AutoComplete.defaultProps = {
  isLoading: false,
  onChange: noop,
  onSelect: noop,
  onReset: noop,
  label: 'Search...',
};

export default AutoComplete;
