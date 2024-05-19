import { makeAutoObservable } from "mobx";
import axios from "axios";

interface Repo {
    name: string;
    owner: {
        avatar_url: string | undefined;
    };
    id: number;
    description: string;
    stargazers_count: number;
    updated_at: string;
}

class RepoStore {
    repos: Repo[] = [];
    page: number = 1;
    name: string = '';
    repoPerPage: number = 9;
    type: string = 'all';

    constructor() {
        makeAutoObservable(this);
        this.setName = this.setName.bind(this);
        this.setType = this.setType.bind(this);
        this.setPage = this.setPage.bind(this);
        this.fetchRepos = this.fetchRepos.bind(this);
        this.resetStore = this.resetStore.bind(this);
    }

    async fetchRepos(): Promise<void> {
        if (this.name) {
            await axios.get<Repo[]>(`https://api.github.com/orgs/${this.name}/repos?type=${this.type}`)
                .then(response => {
                    this.repos = response.data.reverse();
                })
                .catch(error => {
                    console.error("Не удалось получить репозитории", error);
                });
        } else {
            this.repos = [];
        }
    }

    setName(newName: string): void {
        this.name = newName;
        this.fetchRepos();
    }

    setPage(newPage: number): void {
        this.page = newPage;
        this.fetchRepos();
    }

    setType(newType: string): void {
        this.type = newType;
        this.fetchRepos();
    }

    resetStore(): void {
        this.repos = [];
        this.page = 1;
        this.name = '';
        this.type = 'all';
    }

    get currentRepos(): Repo[] {
        const indexOfLastRepo = this.page * this.repoPerPage;
        const indexOfFirstRepo = indexOfLastRepo - this.repoPerPage;
        return this.repos.slice(indexOfFirstRepo, indexOfLastRepo);
    }

    get totalPages(): number {
        return Math.ceil(this.repos.length / this.repoPerPage);
    }
}

const repoStore = new RepoStore();

export default repoStore;
