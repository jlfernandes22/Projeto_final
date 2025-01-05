import { useNavigation } from "./NavigationContext";
import Profile from "./Profile/Profile";
import FeedPage from "./Feed/FeedPage"
import Message from "./Messages/Message";
import SpecificMessage from "./Messages/SpecificMessage";
import Search from "./Search/Search";
import Content from "./Content/Content";
import Loginpage from "./Login/Loginpage";
import EditProfile from "./Definitions/EditProfile";
import OtherProfiles from "./Profile/OtherProfiles";

function DefaultMain() {

    const { page } = useNavigation();



    return (
            <>
                {page === "login" && <Loginpage />}
                {page === "feed" && <FeedPage />}
                {page === "profile" && <Profile />}
                {page === "messages" && <Message />}
                {page === "specificmessage" && <SpecificMessage />}
                {page === "search" && <Search />}
                {page === "addcontent" && <Content />}
                {page === "editprofile" && <EditProfile/>}
                {page === "otherprofiles" && <OtherProfiles/>}
            </>
    );
}

export default DefaultMain;