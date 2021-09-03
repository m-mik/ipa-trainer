
<h1 align="center">IPA Trainer</h1>

<h4 align="center">
Improve your English pronunciation by practicing the International Phonetic Alphabet
</h4>

<p align="center">
  <a href="https://ipa-trainer.vercel.app/" target="_blank">Demo</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#technology">Technology</a> •  
  <a href="#development">Development</a> •
  <a href="#license">License</a>
</p>

<br />

<p align="center">
  <img width="780" height="575" src="https://user-images.githubusercontent.com/25752752/131999583-ffe65c01-e737-4598-80fc-24d37fd76108.gif" alt="Demo" />
</p>

## Key Features

* Lesson
  - Left click on a keyboard button to add a new symbol
  - Left click on one of the symbols to select it
  - Replace the selected symbol by left clicking on a keyboard button
  - Drag and drop symbols to change their order
  - Right click on a symbol to remove it
* Lesson Summary
  - Displays the number of correct and incorrect answers along with the points the user has earned
* Settings
  - Controls lesson's audio volume and auto play behavior
  - Allows to switch between American and British English pronunciation
* Leaderboard
  - The paginated ranking of players with the most points
* User Profile
  - Shows the user's details, including points and lesson history
* IPA
  - An introduction to the International Phonetic Alphabet with example words and audio files
* Authentication
  - Allows logging in with demo credentials or a GitHub account
* Statistics
  - Displays the number of users, lessons, answers, words and pronunciations
* Word Definition Fetcher
  - Fetches word definition for the provided word and part of speech

## Technology

<br />

<table>
  <thead>
    <tr>
      <th align="center" colspan="2" width="400">Frontend</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TypeScript</td>
      <td>4.3.5</td>
    </tr>
    <tr>
      <td>Next.js</td>
      <td>11.1.0</td>
    </tr>
    <tr>
      <td>Chakra UI</td>
      <td>1.6.5</td>
    </tr>
    <tr>
      <td>React Query</td>
      <td>3.19.0</td>
    </tr>
    <tr>
      <td>NextAuth.js</td>
      <td>0.5.3</td>
    </tr>
    <tr>
      <td>react-beautiful-dnd</td>
      <td>13.1.0</td>
    </tr>
    <tr>
      <td>Framer Motion</td>
      <td>4.1.17</td>
    </tr>
    <tr>
      <td>Next SEO</td>
      <td>4.26.0</td>
    </tr>
    <tr>
      <td>date-fns</td>
      <td>2.23.0</td>
    </tr>
  </tbody>
</table>

<br />

<table>
  <thead>
    <tr>
      <th align="center" colspan="2" width="400">Backend</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TypeScript</td>
      <td>4.3.5</td>
    </tr>
    <tr>
      <td>Node.js (Serverless API)</td>
      <td>14.17.3</td>
    </tr>
    <tr>
      <td>PostgreSQL</td>
      <td>12.8</td>
    </tr>
    <tr>
      <td>Prisma</td>
      <td>2.29.0</td>
    </tr>
    <tr>
      <td>next-connect</td>
      <td>0.10.1</td>
    </tr>
    <tr>
      <td>NextAuth.js</td>
      <td> 0.5.3</td>
    </tr>
    <tr>
      <td>next-joi</td>
      <td>2.2.1</td>
    </tr>
    <tr>
      <td>cheerio</td>
      <td>1.0.0-rc.10</td>
    </tr>
    <tr>
      <td>p-queue</td>
      <td>6.6.2</td>
    </tr>
  </tbody>
</table>

<br />

<table>
  <thead>
    <tr>
      <th align="center" colspan="2" width="400">Tests</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jest</td>
      <td>26.6.3</td>
    </tr>
    <tr>
      <td>React Testing Library</td>
      <td>12.0.0</td>
    </tr>
    <tr>
      <td>Mock Service Worker (MSW)</td>
      <td>0.35.0</td>
    </tr>
  </tbody>
</table>


## Development

```bash
# Clone this repository
$ git clone https://github.com/m-mik/ipa-trainer.git

# Go into the repository
$ cd ipa-trainer

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## License
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

