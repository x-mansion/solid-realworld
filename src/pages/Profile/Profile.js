import { useStore, useRouter } from "../../store";
import NavLink from "../../components/NavLink";
import ArticleList from "../../components/ArticleList";

export default () => {
  const [store, { setPage, loadArticles, unfollow, follow }] = useStore(),
    {} = useRouter(),
    handleClick = ev => {
      ev.preventDefault();
      store.profile.following ? unfollow() : follow();
    },
    handleSetPage = page => {
      setPage(page);
      loadArticles();
    },
    isUser = store.currentUser && store.profile.username === store.currentUser.username;

  return (
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img src={store.profile?.image} class="user-img" alt="" />
              <h4>{store.profile?.username}</h4>
              <p>{store.profile?.bio}</p>
              {isUser && (
                <NavLink
                  to="/settings"
                  class="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i class="ion-gear-a" /> Edit Profile Settings
                </NavLink>
              )}
              {!isUser && (
                <button
                  class="btn btn-sm action-btn"
                  classList={{
                    "btn-secondary": store.profile?.following,
                    "btn-outline-secondary": !store.profile?.following
                  }}
                  onClick={handleClick}
                >
                  <i class="ion-plus-round" />
                  &nbsp;
                  {store.profile?.following ? "Unfollow" : "Follow"} {store.profile?.username}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <NavLink
                    class="nav-link"
                    isActive={(match, location) => {
                      return location.pathname.match("/favorites") ? 0 : 1;
                    }}
                    to={`/@${store.profile?.username}`}
                  >
                    My Articles
                  </NavLink>
                </li>

                <li class="nav-item">
                  <NavLink
                    class="nav-link"
                    to={`/@${store.profile?.username}/favorites`}
                  >
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>

            <ArticleList
              articles={Object.values(store.articles)}
              totalPagesCount={store.totalPagesCount}
              onSetPage={handleSetPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};