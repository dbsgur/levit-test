import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { BrandDealProvider } from "./libs/brand-deal";

function App() {
  return (
    <BrandDealProvider>
      <RouterProvider router={router} />
    </BrandDealProvider>
  );
}

export default App;
