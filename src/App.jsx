import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import PageAuthSignIn from "./pages/auth/PageAuthSignIn.jsx";
import { useState } from "react";
import { ContextApplication } from "./libs/config/contexts.js";
import PageCommonOutlet from "./pages/commons/PageCommonOutlet.jsx";
import PageKaryawanList from "./pages/karyawan/PageKaryawanList.jsx";
// import PageKaryawanCreate from "./pages/karyawan/PageKaryawanCreate.jsx";
import PagePotonganCreate from "./pages/potongan/PagePotonganCreate.jsx";
import PagePotonganList from "./pages/potongan/PagePotonganList.jsx";
import PagePotonganDetail from "./pages/potongan/PagePotonganDetail.jsx";
import PageKaryawanDetail from "./pages/karyawan/PageKaryawanDetail.jsx";
import PageDepartemenList from "./pages/departemen/PageDepartemenList.jsx";
import PagePenggajianList from "./pages/penggajian/PagePenggajianList.jsx";
import PageDepartemenCreate from "./pages/departemen/PageDepartemenCreate.jsx";
import PageDepartemenDetail from "./pages/departemen/PageDepartemenDetail.jsx";
import PagePenggajianPrint from "./pages/penggajian/PagePenggajianPrint.jsx";
import PagePenggajianCreate from "./pages/penggajian/PagePenggajianCreate.jsx";
import PagePenggajianDetail from "./pages/penggajian/PagePenggajianDetail.jsx";
import PageJabatanList from "./pages/jabatan/PageJabatanList.jsx";
import PageJabatanCreate from "./pages/jabatan/PageJabatanCreate.jsx";
import PageJabatanDetail from "./pages/jabatan/PageJabatanDetail.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <ContextApplication.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <HashRouter>
          <Routes>
            <Route path="/" element={<PageCommonOutlet />}>
              <Route index={true} element={<PageKaryawanList />} />
              <Route path={"detail/:id"} element={<PageKaryawanDetail />} />
            </Route>
            <Route path="/potongan" element={<PageCommonOutlet />}>
              <Route index={true} element={<PagePotonganList />} />
              <Route path={"potongan"} element={<PagePotonganCreate />} />
              <Route path={"detail/:id"} element={<PagePotonganDetail />} />
            </Route>
            <Route path="/departemen" element={<PageCommonOutlet />}>
              <Route index={true} element={<PageDepartemenList />} />
              <Route path={"create"} element={<PageDepartemenCreate />} />
              <Route path={"detail/:id"} element={<PageDepartemenDetail />} />
            </Route>
            <Route path="/penggajian" element={<PageCommonOutlet />}>
              <Route index={true} element={<PagePenggajianList />} />
              <Route path={"penggajian"} element={<PagePenggajianCreate />} />
              <Route path={"detail/:id"} element={<PagePenggajianDetail />} />
              <Route path={"printer"} element={<PagePenggajianPrint />} />
            </Route>
            <Route path="/jabatan" element={<PageCommonOutlet />}>
              <Route index={true} element={<PageJabatanList />} />
              <Route path={"new"} element={<PageJabatanCreate />} />
              <Route path={"detail/:id"} element={<PageJabatanDetail />} />
            </Route>
          </Routes>
        </HashRouter>
      </ContextApplication.Provider>
    </>
  );
};

export default App;
