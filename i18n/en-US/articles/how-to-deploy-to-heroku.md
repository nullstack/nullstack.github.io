---
title: How to Deploy a Nullstack application on Heroku
description: You can host a Nullstack application anywhere. Deploy it on Vercel, Heroku, AWS, Azure, GitHub pages, or anywhere else.
---

Use the Buildpack `heroku/nodejs`.

Create a `Procfile` in the application root with the following:

```
web: node .production/server.js
```

## Next step

> 🎉 **Congratulations!** You are done with the documentation!

⚔ If you want to see this more examples please [open an issue on github](https://github.com/nullstack/nullstack/issues).