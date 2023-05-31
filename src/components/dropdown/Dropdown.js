import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { style } from "./style";


function Dropdown({ options, defaultOption, onChange, name, selectedValue }) {
  return (
    <FormControl sx={style.formControl}>
      <InputLabel
        shrink={false}
        sx={{ width: "60%", "&.Mui-focused": { color: "text.primary" } }}
        id="elect-autowidth-label"
      >
        <Typography variant="h6">{!selectedValue && defaultOption}</Typography>
      </InputLabel>
      <Select
        variant="outlined"
        MenuProps={{
          sx: style.menuProp,
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }}
        sx={style.select}
        labelId="select-autowidth-label"
        id="select-autowidth"
        value={selectedValue}
        onChange={onChange}
        autoWidth
        label={defaultOption}
        name={name}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Typography variant="h6">{option.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Dropdown;
