import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import LanguageList from "./components/LanguageList";
import 'github-markdown-css';
import Loader from "./components/loader/Loader";
import IconBack from "./components/IconBack/IconBack";
import IconLink from "./components/IconLink/IconLink";
import IconStar from './components/IconStar/IconStar';
import IconWatch from "./components/IconWatch/IconWatch";
import IconFork from "./components/IconFork/IconFork";
import decodeBase64 from "../../../utils/decodebase";


const RepoPage = ({nameAcc}:any ) => {
    const { name } = useParams<{ name: string }>();
    const [repoInfo, setRepoInfo] = useState<any>(null);
    const [lang, setLang] = useState<{ [key: string]: number }>({});
    const [contributors, setContributors] = useState<any[]>([])
    const [topics, setTopics] = useState<any>(null)
    const [ava, setAva] = useState<string>('')
    const [readmeName, setReadmeName] = useState<String>('')
    const [readme, setReadme] = useState<any>('')

    useEffect(() => {
        axios.get(`https://api.github.com/repos/${nameAcc}/${name}`).then(response => {
            setRepoInfo(response.data);
            setTopics(response.data.topics)
            setAva(response.data.owner.avatar_url)
        }).catch(error => {
            console.error("Error fetching repository info:", error);
        });
    }, [name]); 

    useEffect(() => {
        axios.get(`https://api.github.com/repos/${nameAcc}/${name}/languages`).then(response => {
            setLang(response.data)
        })

        axios.get(`https://api.github.com/repos/${nameAcc}/${name}/contributors`).then(response => {
            setContributors(response.data)
        })

        axios.get(`https://api.github.com/repos/${nameAcc}/${name}/readme`).then(response => {
            setReadmeName(response.data.name)
            const markdown = decodeBase64(response.data.content);
            const html = marked(markdown);
            setReadme(html);
        })
    }, [repoInfo])

    
    

    if (!repoInfo) {
        return <Loader/>
    }

    return (
        <div className="repo__page">
            <div className="repo__page-top">
                <Link to={'/'}>
                    <IconBack/>
                </Link>
                <img src={`${ava}`} alt="ava" className="repo__page-ava" />
                <span>{repoInfo.name}</span>
            </div>

            <div className="repo__page-middle">
                <Link to={`${repoInfo.html_url}`} className="link" target="_blank">
                    <IconLink/>
                    <span>
                        {repoInfo.name}
                    </span>
                </Link>

                <ul className="repo__page-topics">
                    {topics.map((topic:any, index:number) => (
                        <li key={index}>{topic}</li>
                    ))}
                </ul>

                <ul className="repo_page-stars-watch-forks">
                    <li>
                        <IconStar/>
                        <span>{repoInfo.stargazers_count} {repoInfo.stargazers_count.length > 3 ? 'stars' : 'star'}</span>
                    </li>

                    <li>
                        <IconWatch/>
                        <span>{repoInfo.watchers_count} {'watching'}</span>
                    </li>

                    <li>
                        <IconFork/>
                        <span>{repoInfo.forks_count} {'forks'}</span>
                    </li>
                </ul>
                
                <div className="repo__page-contributors-languages">
                    <div>
                        <span>Contributors <span className="repo__page-contributors-count">{contributors.length}</span></span>
                        <ul>
                            {contributors.map((contributor: any, index: number) => (
                                <li key={index} className="repo__page-contributor">
                                    <img src={contributor.avatar_url} alt="contributor ava" className="repo__page-contributor-ava"/>
                                    {contributor.login}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <span>Languages</span>
                        {lang && <LanguageList languages={lang} />}
                    </div>

                </div>
            </div>

            <div className="markdown-body repo__page-readme"  dangerouslySetInnerHTML={{ __html: readme }} />

        </div>
    );
};

export default RepoPage;