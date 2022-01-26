# API Documentation
## Basics
This API provides 2 main ways to interact with it - live querying and displaying and image or pre-creating an image based on some settings and then embedding it with a unique URL.

This is designed to cover both popular use cases for image embeds - Using them in a public place without an API key or using them privately with an API key.

Head over to Rapid API to see examples of how to use the API and get an API Key.

Connect on RapidAPI
<p>
  <a href="https://rapidapi.com/random-shapes-random-shapes-default/api/weather-embed" target="_blank">
    <img src="https://files.readme.io/1de5087-rapidapi-badge-light.png" width="215" alt="Connect on RapidAPI">
  </a>
</p>

## Background Color
Query Paramater: backgroundColor

Default: transparent

The Background Color is to set the color behind the weather icons and text.

This supports any hex code (Such as #fff) or any CSS color name (like white).

## Text Color
Query Paramater: textColor

Default: black

The Text Color is to set the color that is used for both the text and the icons.

This supports any hex code (Such as #000) or any CSS color name (like black).

## City
Query Paramater: city

Default: Geolocates based on IP Address

What City's weather you would like to display. The Country field is also required to use the City field.

## Country
Query Paramater: country

Default: Geolocates based on IP Address

Required to use the Country field. 2 Letter Country Code I.E. US, CA, etc.

## Units
Query Paramater: units

Default: metric

Options: metric or imperial

What weather units you want your weather displayed in.

## Days
Query Paramater: days

Default: 7

The number of days of forecast you want to display.
