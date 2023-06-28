# RN Mobility

Learn how to use your RN license in another state.

Transfer or work across state lines.

## Project scope

An easier path to working in another state as a registered nurse. The research has been done for you.

What you will find on each state’s page is an explanation of what each state requires for you to transfer (by endorsement or reciprocity) your license, work across state lines, and guidelines for renewals and continuing competency.

## Contributing

This project is open access and we welcome your updates for factual corrections and anything else you can add to the site. Please navigate above to open any page on the website and click the edit :pencil2: icon.

---

## TODO:

- [ ] maybe add lighthouse validation checking

  - https://developer.chrome.com/docs/lighthouse/overview/
  - https://github.com/GoogleChrome/lighthouse-ci

---

## How to run this application locally

### Setup environment

_In production (GitHub Actions), environment is setup by by workflows in .github/workflows/._

_For local testing (try VS Code + Dev Containers extension, Rancher Desktop), these steps are performed by .devcontainer/ when you run Reopen in Container._

1. Install Ruby (use version in build-test-publish.yml in "Setup Ruby", (try rbenv)

1. Install Jekyll

   ```sh
   gem update --system
   gem install bundler
   bundle install
   ```

1. Install Node & yarn, use version in build-test-publish.yml in "Setup Node.js", (try nvm)
   ```sh
   nvm use lts/*
   yarn install
   ```

### Build the site

Build the HTML website (see available localhost:#### port in the console output):

```sh
bundle exec jekyll build
```

### Serve/run the site

```sh
bundle exec jekyll serve
```

### For PHP, build the site here and run the server on your local terminal

```sh
(cd build; php -S localhost:4001)
```

### Testing

All testing is performed using Node scripts:

```sh
yarn install
yarn run test-build-html-validate
```
