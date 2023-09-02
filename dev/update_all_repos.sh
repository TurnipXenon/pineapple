mapfile -t allRepos < ./dev/repo_list.txt

for repo in ${allRepos[@]}; do
    cd ..
    cd $repo
    git checkout main
    git branch -D bot/pineapple-update
    git pull origin main
    git checkout -b bot/pineapple-update
    npm install github:TurnipXenon/pineapple
    git add package.json package-lock.json
    # todo: update to also include the PR where the update was from
    git commit -m "Auto-script: update to latest pineapple build"
    git push origin bot/pineapple-update
    cd ../pineapple
done