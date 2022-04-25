This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It is published at movies.hhofner.com

## Getting Started

### Running the development server.
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Developer Notes

Recently, I've had a nostalgia for some classic Apple products, in particular 
the iPod and all its fun intricansies. In particular, I thought the 
[Coverflow](https://www.oreilly.com/library/view/ipod-the-missing/9780596155834/httpatomoreillycomsourceoreillyimages216284.png.jpg) was always super fun and cool, and I thought that instead of doing the usual grid view for movie search, I thought I would try to implement coverflow but for movies.

I was almost there, I only wasn't able to get the right amount of translation across the X
axis right. Depending on which position the movie image was in the list, I think I needed to apply
a different X-axis translation, and this is also due to the rotation applied.

On the topic of the tech stack, I chose Next.js (and specifically React) because I think it's
the easiest for me to go from nothing to something really quickly. I was even able to set up
a deployment for it on vercel (movies.hhofner.com). 

As for any React project however, there's still a decision to be made for styling.
I hadn't used `styled-components` in a while and if I were going to try to use animations I thought
it might be worth trying. I ran into some [annoying problems](https://github.com/styled-components/styled-components/issues/3474) in the dev side however with server side
and client side styling mismatches due the library, and so I'm now convinced that tailwind or 
Svelte would have been better (as Svelte's built in animation support is good).



