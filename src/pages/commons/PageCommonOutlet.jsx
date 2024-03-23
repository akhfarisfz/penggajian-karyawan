import { useContext } from "react";
import { ContextApplication } from "../../libs/config/contexts";
import PageAuthSignIn from "../auth/PageAuthSignIn";
import { Outlet } from "react-router-dom";
import LibComponentNavbar from "../../libs/components/LibComponentNavbar.jsx";
import WidgetUsersSignInModal from "../../../widget/users/WidgetUsersSignInModal.jsx";

const PageCommonOutlet = () => {
  const application = useContext(ContextApplication);

  return (
    <>
      {application.isAuthenticated ? (
        <>
          <LibComponentNavbar />
          <Outlet />
        </>
      ) : (
        <WidgetUsersSignInModal />
      )}
    </>
  )

}

export default PageCommonOutlet;