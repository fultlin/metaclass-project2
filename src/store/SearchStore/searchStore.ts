import { action, makeAutoObservable, observable, toJS } from "mobx";
import axios from "axios";

interface Repo {
    name: string;
    owner: {
        avatar_url: string;
    };
    id: number;
    description: string;
}

class SearchStore {
  query: string = "";
  repos: Repo[] = [];
  isLoading: boolean = false;
  error: string = "";

  constructor() {
    makeAutoObservable(this, {
        repos: observable,
        fetchRepos: action,
    });
  }

  setQuery(newQuery: string) {
    this.query = newQuery;
  }

  async fetchRepos() {
    if (!this.query) return;

    this.isLoading = true;
    this.repos = [];
    this.error = "";

    this.repos = (await axios.get<Repo[]>(`https://api.github.com/orgs/${this.query}/repos`)).data
    this.repos = (this.repos)
    console.log(toJS(this.query))
  }

  
}

export const searchStore = new SearchStore();