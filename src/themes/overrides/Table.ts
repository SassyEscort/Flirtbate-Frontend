// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Table(theme: any) {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral
        }
      }
    }
  };
}
