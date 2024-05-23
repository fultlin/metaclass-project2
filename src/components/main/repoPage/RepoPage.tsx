import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { observer, useLocalObservable, useLocalStore } from "mobx-react-lite";
import RepoStore from "../../../store/RepoStore/RepoPage";
import LanguageList from "./components/LanguageList";
import Loader from "./components/loader/Loader";
import IconBack from "./components/IconBack/IconBack";
import IconLink from "./components/IconLink/IconLink";
import IconStar from './components/IconStar/IconStar';
import IconWatch from "./components/IconWatch/IconWatch";
import IconFork from "./components/IconFork/IconFork";

const RepoPage = observer(() => {
  const { name } = useParams<{ name: string }>();
  const { nameAcc } = useParams<{ nameAcc: string | any}>();
  const store = useLocalObservable(() => new RepoStore());

  useEffect(() => {
    if (name) {
      store.fetchRepoInfo(nameAcc, name);
      store.fetchLanguages(nameAcc, name);
      store.fetchContributors(nameAcc, name);
      store.fetchReadme(nameAcc, name);
    }
  }, [name]);

  if (!store.repoInfo) {
    return <Loader />;
  }

  return (
    <div className="repo__page">
      <div className="repo__page-top">
        <Link to={-1} className="repo__page-back">
          <IconBack />
        </Link>
        <img src={`${store.ava}`} alt="ava" className="repo__page-ava" />
        <span>{store.repoInfo.name}</span>
      </div>

      <div className="repo__page-middle">
        <Link to={`${store.repoInfo.html_url}`} className="link" target="_blank">
          <IconLink />
          <span>
            {store.repoInfo.name}
          </span>
        </Link>

        <ul className="repo__page-topics">
          {store.topics.map((topic: any, index: number) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>

        <ul className="repo_page-stars-watch-forks">
          <li>
            <IconStar />
            <span>{store.repoInfo.stargazers_count} {store.repoInfo.stargazers_count > 1 ? 'stars' : 'star'}</span>
          </li>

          <li>
            <IconWatch />
            <span>{store.repoInfo.watchers_count} {'watching'}</span>
          </li>

          <li>
            <IconFork />
            <span>{store.repoInfo.forks_count} {'forks'}</span>
          </li>
        </ul>

        <div className="repo__page-contributors-languages">
          <div>
            <span>Contributors <span className="repo__page-contributors-count">{store.contributors.length}</span></span>
            <ul>
              {store.contributors.map((contributor: any, index: number) => (
                <li key={index} className="repo__page-contributor">
                  <img src={contributor.avatar_url} alt="contributor ava" className="repo__page-contributor-ava" />
                  {contributor.login}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span>Languages</span>
            {store.lang && <LanguageList languages={store.lang} />}
          </div>
        </div>
      </div>

      <div className="markdown-body repo__page-readme" dangerouslySetInnerHTML={{ __html: store.readme }} />
    </div>
  );
});

export default RepoPage;
