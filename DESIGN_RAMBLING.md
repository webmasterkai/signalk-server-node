## Differences between providers, plugins, interfaces

- _pipedproviders_ are Node streams and can handle backpressure. practical examples are throttling (the existing pipe elements) and for example batch processing an input file to a db such as InfluxDb: unthrottled file input will overwhelm the signalk-to-influxdb plugin
- plugins can not be enabled by default
- _interfaces_ was just to give a bit of structure to the code, not the result of Grand Design
- The declarative configuration ui in plugins means no need to change the admin ui when you make changes.

## Monorepo

Using one repo to manage the code but then publishing multiple npm modules from same git repo? (edited)
one argument for monorepo is that you no longer need to figure out which repo the issue should be in - people frequently make mistakes and then there's cross cutting issues
also our current changelog generation is based on the server repo, but if the plugins included are core then one changelog is actually good
as users perceive what they install as a whole
Most other plugins are going to have specific repos so they are okay to keep in dedicated repos.
