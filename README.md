# Earthstrike visualization

Check out the [data repo (WIP)](https://github.com/EngSciMath-team/earthstrike-data) too!

## Installation
Install:
``` bash
yarn install # or npm
```

Run development server:
``` bash
yarn run dev # or npm
```

and open `localhost:8080` in your browser.

## Description
The plan is to create a interactive data visualization that explains the consequences of climate change. The page will consist of a text describing these consequences, accompanied by several interactive charts. As the reader scrolls through the text, the charts respond and display information relevant to what the user is reading about. In addition, the charts could be interactive themselves. For example: when the user is reading about deforestation, we could show a world map, where hovering the mouse over a country would display a time series graph showing reduction in square kilometers covered by forest.

The text will be structured roughly along the same lines as the book [Six degrees](https://en.wikipedia.org/wiki/Six_Degrees:_Our_Future_on_a_Hotter_Planet) by Mark Lynas. For every degree that the global average temperature will rise, the text will summarize what can be expected to happen according to climate change research. When the structure of the text becomes more clear, it would be good to add some references to more recent research as well, since the book is from 2007.

Right now, the first and main visualization is a spinning globe that can respond to user events by rotating and zooming to specific locations, as well as displaying relevant geographic data- run the dev server for a demonstration. For now, these functions are triggered by click events, but those will be replaced by scroll events later. For an example of a visualization that responds to scroll events, see https://www.abc.net.au/news/2017-10-16/north-korea-missile-range-map/8880894. Once it becomes clear what other data we want to display, more visualizations can be added.

By the way- none of this is definite, so feel free to suggest changes to the approach. This is just a summary of what has been agreed upon so far.

## What is to be done?
- The [data repo](https://github.com/EngSciMath-team/earthstrike-data) contains some potentially useful datasets and scripts that are used to pre-process raw datasets to make them more browser friendly. Some of the raw datasets are small and can just be shared through GitHub, but some larger datasets (like 300mb raster GIS data) need to be shared in some other way. One possible solution to share the bigger files is to use a [Makefile](https://en.wikipedia.org/wiki/Makefile) that automatically downloads the data that you are interested in from the appropriate source. Unfortunately, not all datasets are available by direct download links, or require logging in etc. So where possible we will put the direct download link in the Makefile, but for some datasets it would be more convenient to host them ourselves, and provide a direct download link to our own server/API. This hosting will hopefully be set up in the next couple of days (after the holidays).

- I am currently working on a summary of the six degrees book (see the `literature` folder). With this summary we can have a good overview of the categories of disasters that will occur at different degrees increase of average global temperature.

- With a complete summary and overview, it will be easier to structure the text.

- Once there is a broad outline of what the text will look like, we can
  - start writing the actual text
  - find some more recent relevant papers
  - start collecting data for the visualizations
  - process the data
  - code the visualizations


- Again: if you have any ideas, find read papers, or stumple upon relevant datasets: post it in the `#climate-coalition-dev` channel, save it to the `literature/links.txt` file and make a PR, or add it to the datasets folder or Makefile in the [data repo](https://github.com/EngSciMath-team/earthstrike-data).

☭☭☭☭☭
