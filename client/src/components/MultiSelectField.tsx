import React from "react";
import { TextField, Chip, MenuItem, SelectProps } from "@material-ui/core";

type MultiSelectValue = {
  id: string;
  name: string;
};

type MultiSelectProps = {
  id: string;
  label: string;
  required: boolean;
  fullWidth: boolean;
  value?: MultiSelectValue[];
  options: MultiSelectValue[];
  onChange: (newValue: MultiSelectValue[]) => void;
};

const MultiSelectField: React.FC<MultiSelectProps> = ({
  id,
  label,
  fullWidth,
  required,
  onChange,
  value = [],
  options
}) => {
  const nameById = new Map(options.map(({ id, name }) => [id, name]));

  const SelectProps: Partial<SelectProps> = {
    multiple: true,
    renderValue: value => {
      const selectedIds = (value as string[]) ?? [];
      const selected = selectedIds.map(id => ({ id, name: nameById.get(id) }));

      return (
        <div>
          {selected.map(({ id, name }) => (
            <Chip key={id} label={name} />
          ))}
        </div>
      );
    },
    onChange: e => {
      const selectedIds = (e.target.value as string[]) ?? [];
      const selected = selectedIds.map(id => ({
        id,
        name: nameById.get(id) as string
      }));

      const selectedSorted = selected.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      onChange(selectedSorted);
    }
  };

  return (
    <TextField
      id={id}
      select
      label={label}
      required={required}
      fullWidth={fullWidth}
      SelectProps={SelectProps}
      value={value.map(({ id }) => id)}
    >
      {options.map(({ id, name }) => (
        <MenuItem
          key={id}
          // @ts-ignore
          value={id}
        >
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default MultiSelectField;
