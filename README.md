# Welcome to Quiz It Up

## Summary

Here, you'll be able to:

- See your balance of QUIZ in Ropsten.
- Connect your Metamask wallet to interact with the dApp. If Metamask is not installed, there will be a message encouraging the user to install it.
- Move to the Ropsten network just clicking a button, if the current network on Metamask is another one.
- Answer the daily trivia, where each question will be available for a limited amount of seconds and, answered or not, it'll move to the next question.
- See an overview with all the answers, once all the questions are finished.
- Submit the questions to the validator contract. 

## Getting started

To run the app, you'll have 2 options:

1. Go to the [deployed app](https://quiz-it-up.vercel.app/), this is by far the simplest and fastest option!
2. Run the app locally.


### Run the app locally

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Flow

1. When initializing the app, it'll automatically check whether there's a wallet connected or not. In the latter case, there will be a button to connect one.
2. Once there's an account connected, it'll also check whether the network is Ropsten. In the case Metamask is set to a different network, there will be also a button to easily change to Ropsten.
3. If there's an account and the network is correct, the balance of the QUIZ token for that account will be displayed on the top-left corner.
3. There will also show up the title and image of the daily trivia, with a button to start answering it.
4. Clicking on it, the questions of the trivia will start showing up on the screen and the timer will start counting down for each question. Answer each question before the timer reaches 0, or the anser will be marked as "No response" and it'll move to the next question. You'll also notice a bar displaying the progress along the quiz.
5. Once all the questions are responded, you'll see an Overview panel showing all the questions an answers.
6. Click on the Submit button. This, in addition to make Metamask prompt to complete the transaction, will also open a modal with the status of the transaction. In case of error, the error will be displayed in the modal. In case of success, it'll display a link to verify the transaction in Etherscan and will automatically update the balance of QUIZ.

### Desktop

https://user-images.githubusercontent.com/52573144/186010196-c9978710-3c31-40d4-9cf0-dceb2a72e5eb.mov

### Mobile

https://user-images.githubusercontent.com/52573144/186010025-1cd62c50-0ca4-47d5-9a91-e71755851608.mov

### Thank you for making it this far!
If you have suggestions, feel free to open an issue or PR and I'll be glad to review it.