import { SxProps, Theme } from "@mui/material";

export function selectStyles<T extends Theme = Theme>(
  ...sxs: (SxProps<Theme> | (boolean | SxProps<Theme>)[] | undefined)[]
): SxProps<T> {
  const final: SxProps<T>[] = [];
  for (const sx of sxs) {
    if (Array.isArray(sx)) {
      if (
        (sx as (boolean | SxProps<T>)[]).filter((v) => typeof v === "boolean")
          .every((v) => v)
      ) {
        // If every entry is true
        final.concat(
          (sx as (boolean | SxProps<T>)[]).filter((v) =>
            typeof v !== "boolean"
          ) as SxProps<T>[],
        );
      }
    } else if (sx !== undefined) {
      final.push(sx);
    }
  }

  return Object.assign({}, ...final.reverse());
}

// Shorthand for select styles helper
export const ss = selectStyles;
