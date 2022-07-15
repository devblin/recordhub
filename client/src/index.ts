import { createRepo, getAllRepos, getProfile } from "./api";
import { isAuthenticated, logout, } from "./auth"

export type UserProfile = {
  displayName: string
  id: number
  profileImage: string
  userName: string
}

(async () => {
  document.title = "Recordhub";

  const checkAuth = isAuthenticated()

  const repoListEle = (name: string, id: number) => `
  <span href="#" data-id=${id} class="list-group-item list-group-item-action list-group-item-info">
          <span class="ml-2">${name}</span>
      </span>
    ` as unknown as HTMLElement

  const GITHUB_AUTH_URL = "http://localhost:3000/auth/github";
  const DEFAULT_IMG = "https://avatars.githubusercontent.com/u/109339471?v=4";

  const userNameBox = <HTMLElement>document.getElementById("username");
  const logoutBtn = <HTMLElement>document.getElementById("logout_btn");
  const repoListBox = <HTMLElement>document.getElementById("repo_list");
  const githubBtn = document.getElementById("github_btn");
  const authPage = document.getElementById("auth_section");
  const userImg = document.getElementById("user_img");
  const repoBtn = document.getElementById("create_repo_btn");
  const msgBox = <HTMLElement>document.getElementById("message");
  const repoVisibility = <HTMLInputElement>document.getElementById("repo_visibility");
  const repoNameInput = <HTMLInputElement>document.getElementById("repo_name");

  let checkTrueAuth = {}
  try {
    checkTrueAuth = await getProfile()
  } catch (error) { }

  if (checkAuth && checkTrueAuth) {
    const res = await getProfile()
    const userProfile = res.data as UserProfile

    const repos = await getAllRepos()

    repoListBox.innerHTML = ""
    repoListBox.innerText = ""

    if (repos.data.length > 0) {
      const repoList = repos.data

      repoList.forEach((e: any) => {
        const ele = repoListEle(e.name, e.id)

        repoListBox.innerHTML = ele + repoListBox.innerHTML
      });
    }
    else {
      repoListBox.innerHTML = "<h6 class='text-danger'>⚠️ No repositories created here. Enter and click on above input box to create a repository<h6>"
    }

    repoBtn.addEventListener("click", async () => {
      const repoName = repoNameInput.value
      const privateRepo = repoVisibility.checked

      msgBox.innerText = "Please Wait..."
      msgBox.className = "text-warning"

      try {
        const res = await createRepo(repoName, privateRepo)

        if (res.status == 500) {
          msgBox.innerText = res.data.message
          msgBox.className = "text-danger"
        } else if (JSON.stringify(res.status)[0] == "2") {
          msgBox.innerText = `Repository "${repoName}" created successfully. Please refresh the page to see updated list of created repositories`
          msgBox.className = "text-success"
        } else {
          msgBox.innerText = res.data.message
          msgBox.className = "text-warn"
        }
      } catch (error) {
        if (error.response) {
          msgBox.innerText = error.response.data.message
        } else {
          msgBox.innerText = error.message
        }
        msgBox.className = "text-danger"
      }
    })

    console.log(userProfile);

    githubBtn.setAttribute("href", "#")
    githubBtn.style.display = "none"
    authPage.style.display = ""
    userImg.setAttribute("src", userProfile.profileImage)
    userNameBox.innerText = ` Welcome! ${userProfile.displayName} `
  } else {
    authPage.style.display = "none"
    githubBtn.setAttribute("href", GITHUB_AUTH_URL)
    userImg.setAttribute("href", DEFAULT_IMG)
  }

  logoutBtn.addEventListener("click", (e) => {
    logout()
    window.location.reload()
  })
})();

