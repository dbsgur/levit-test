// 추후 더 다양한 에러페이지 확장을 위해 errors 폴더에 이 페이지를 만듬.

import { Stack, Typography } from "@mui/material";

const InternalServerError = () => {
  return (
    <Stack sx={{ alignItems: "center" }}>
      <Typography variant="h3">500 Internal Server Error</Typography>
    </Stack>
  );
};

export default InternalServerError;
