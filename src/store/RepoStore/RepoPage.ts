import { makeAutoObservable } from "mobx";
import axios from "axios";
import decodeBase64  from "../../utils/decodebase";
import { marked } from "marked";

class RepoPage {
  repoInfo: any = null;
  lang: { [key: string]: number } = {};
  contributors: any[] = [];
  topics: any = null;
  ava: string = '';
  readme: Promise<string> | string = '';

  constructor() {
    makeAutoObservable(this);
  }

  fetchRepoInfo(nameAcc: string, name: string) {
    axios.get(`https://api.github.com/repos/${nameAcc}/${name}`)
      .then(response => {
        this.repoInfo = response.data;
        this.topics = response.data.topics;
        this.ava = response.data.owner.avatar_url;
        console.log(nameAcc)
      })
      .catch(error => {
        console.error("Error fetching repository info:", error);
      });
  }

  fetchLanguages(nameAcc: string, name: string) {
    axios.get(`https://api.github.com/repos/${nameAcc}/${name}/languages`)
      .then(response => {
        this.lang = response.data;
      });
  }

  fetchContributors(nameAcc: string, name: string) {
    axios.get(`https://api.github.com/repos/${nameAcc}/${name}/contributors`)
      .then(response => {
        this.contributors = response.data;
      });
  }

  fetchReadme(nameAcc: string, name: string) {
    axios.get(`https://api.github.com/repos/${nameAcc}/${name}/readme`)
      .then(response => {
        const markdown = decodeBase64(response.data.content);
        const html = marked(markdown);
        this.readme = html;
      });
  }
}

export default RepoPage;
