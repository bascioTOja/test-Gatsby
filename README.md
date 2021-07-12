# Protrainup gatsby website project

Hey! I have created a Gatsby project, which is connected with Protrainup system, and Prismic as the content managment system!
The project is not perfect, and there could be some issues, i didn't have a perfect API documentation, so part of my code was coded with trust "it will work". So if you will see some issues just report it. Right now i am not able to work on this project, but maybe in the future i will improve this project. 



You can preview this project right here https://www.fastpageproject.zilib.site/



# Info!!!

The project is also created with prismic v4 version, you just have to check which branch you download. 

## Description

This application would be great for you if you want to create your own web page for your sport club. The most important thing is that, you have to be a client of the Protrainup company, it is not compatible with any other company. This application will make your visitors feelings great, the site is very fast and comfortable.

The most important thing, here we will be configure the whole application. If you are not a programmer, and don't know how to configure the system, or you just want to save part of your time you can text to me, and i can configure this application for you for some tips.

Short description of the project. The application is creating staticly some pages which are downloaded from Protrainup API, the slugs of this pages are: 

* /teams
* /teams/${teamName}
* /matches
* /330-2 <- League table
* /matches/match_id
* /news <- That is not protrainup slug, but right there you will be able to check your news which will be loaded from the prismic.

## Requirement / Before read 

It is very important section, because you can waste your time if you are not able to introduce this project by you own.
If your Protrainup account has big database of matches, maybe you will be not able to create first production version. If you want gain every of the benefits you have to have Gatsby Cloud. I didn't test it a lot, but for first global build, and updates you have to have minimum server ram 4 GB.
Of course there are some other ways like netlify, but in my opinion gatsby would be more good for you because you will have to rebuild your sometimes by webhook to fetch data from protrainup. Gatsby is an awesome server host, which has a great technology , and make your site very fast and comfortable for developer. 

If you used different system than gatsby cloud, i would be very greatfull if you tell me about it, and after that i would like to update this readme.
The price of Gatsby server is 20$ per month, but like i wrote. I think after one build you can stop your plan, and get free plan. First 2 weeks on the gatsby is for free, but if you would like to make some code changes or update this project you have to remember that, this project will probabbly not build on the free gatsby plan.

## Installation

### Main configuration

From the main folder you have to input this commands

```nginx
cd gatsby-source-protrainup 
npm install
cd ../ks-stadion
npm install
```

 The project has independent but necessary plugin which have to be installed.
For locale configuration create two files, 

* .env.development
* .env.production

In this env you have to include this variables

* PROTRAINUP_LOGIN <- Your protrainup login
* PROTRAINUP_PASSWORD <- Your protrainup password
* PROTRAINUP_API_URL <- Your protrainup api url
* PRISMIC_TOKEN <- I will tell you later how to get prismic token, but to keep your data safe remember to have this token created
* GATSBY_PRISMIC_REPOSITORY_NAME <- Prismic repository name

## Prismic 

It can be a little bit confusing, but let's go! First of all you have to create your Prismic account https://prismic.io/ so let's register right there!
After register create your repository, the name is up to you. After create your prismic repository i would like to tell you one! Great, prismic is great! 
Okey back to the work, after you create your repository in the left navigation go to the **"Custom types"**

You have to create 5 repeatable types with id: 

* album
* article
* category
* page
* season_year

And 2 single types with id: 

* general
* landingpage

Fine! You have created your documents, right now go to the folder:

```
'./ks-stadion/custom_types/'
```

Here like you see you have the files which have this same names, as id which you created. You have to copy the content of every file to the Prismic. How to do that?
Take for example album, get into **album.json** file, here you can also replace the placeholders, if you would like to see another language as the placeholder than polish just change 

```json
"fieldName": {
    "config": {
        "label": "Your translated label"
        }
}
```

You can adapt your placeholder to the field name.

Okey, start copying this! Copy all of the file, and go to the prismic **custom types**, select **album** type. On the right you have the panel, where you can drag and drop some items. Don't move that! Up to it, you have a 2 tabs "Build mode", and "JSON editor". Select JSON editor, and paste right there **album.json** content. 

Right now you have to only reply this action for every type. I trust, you do it correct!

On the left navigation press document tab, and create some documents. The most important documents are this, with type: 

* General,
* Landing Page,
* Sezon

First of all create the sezon type, right there you just have to insert the actually season f.e **2020/2021**, the seasons are loaded from protrainup system. If the season will not exist, the teams will not appear in your menu. It should be created, for preview purpuroses, but will be not showed for normal user.

After create all seazons, it's time to create general document. Fill it as you want, but remember, the changing logo will not change PWA icon. You have to change icon in the folder. **icon.png**, this file will change PWA icon. Also after logo modify probabbly you will have to do some changes in the code, you have to adapt your logo menu. 

Okey, i think that's all. The best option for you would be to create some data, before your first deploy. The recommended amount of data would be create some widgets, and minimum 5 articles. 

## Prismic - Page integration

To make user able to change baner of the static file i created a option to fetch this baners from prismic (i know perfect!). To do it you have to create 5 pages with this uid 

* teams
* matches
* 330-2 
* news

Ye exactly, this same names as the static created page. Okey, right there it doesn't matter if you use any slice, the application will only fetch SEO data, and baner photo.

# It should be everything from Prismic, go to the code!

Okey, go to the code, here is one important thing. I created a modal for information purpurose and, and commented dynamic SEO data. You have to go into 

```
PTU-Gatsby-Project/ks-stadion/src/components/common/Seo/index.tsx 
```

Right here paste this part of code to make your SEO work

```typescript
import React from 'react'
import { Helmet } from 'react-helmet'

type Props = {
  title?: string
  description?: string
  keywords?: string
  imgSrc?: string
}

const SEO = ({ title, description, keywords, imgSrc }: Props) => {
  return (
    <Helmet>
      {title && <title>{title.slice(0, 155)}</title>}
      {title && <meta property="og:title" content={title} />}

      {description && <meta name="description" content={description.slice(0, 155)} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {imgSrc && <meta property="og:image" content={imgSrc} />}
      {imgSrc && <meta name="twitter:image" content={imgSrc} />}
      {imgSrc && <meta name="twitter:image:src" content={imgSrc} />}
      {imgSrc && <meta property="og:image:secure_url" content={imgSrc} />}
    </Helmet>
  )
}

export default React.memo(SEO)

```

Okey next to it go to the layout file.

```
PTU-Gatsby-Project/ks-stadion/src/layouts/mainLayout.tsx
```

Paste there this code

```typescript
import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

import Footer from '../components/Footer'
import AppBar from '../components/common/AppBar'
import { getSEOData } from '../redux/selectors'

const MainLayout: React.FC<{ isLoaded?: boolean }> = ({ children }) => {
  const SeoData = useSelector(getSEOData)

  return (
    <>
      <Helmet>
        <meta name="author" content="Adrian Bielec, bielecadriandeveloper@gmail.com" />
        <title>{SeoData.title}</title>
        <meta property="og:site_name" content={SeoData.title.slice(0, 70)} />
        <meta name="description" content={SeoData.description.slice(0, 155)} />
        <meta name="keywords" content={SeoData.keywords.join(',')} />
        <meta name="theme-color" content="#edeff4" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content={typeof window === 'undefined' ? '' : window.location.href} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <AppBar />
      <div className="page__wrapper">{children}</div>
      <Footer />
    </>
  )
}

export default MainLayout

```

### Getting API keys

Okey, right now let's fill our .env files. Go to the Prismic, to the setting tab. Right there you have your ENV variable values: ![image-20210618192842445](https://github.com/newadbie/PTU-Gatsby-Project/blob/master/image-20210618192842445.png)

And the **PRISMIC_TOKEN:**  Permament access token, **GATSBY_PRISMIC_REPOSITORY_NAME:**  Application name

## Deploying

Okey! It is time to deploy your application! I will not describe another options to deploy application than with gatsby cloud.
First of all go right there https://www.gatsbyjs.com/ and create your account, remember to take your free 14 days! 

Right now go to the your gitlab / github account and create new repository. Push right there your project, in your settings tab https://github.com/settings/installations you have to configure Gatsby Cloud option. Go right there and you have to select your repository, which will have to access to the gatsby cloud ![image-20210618193610595](https://github.com/newadbie/PTU-Gatsby-Project/blob/master/image-20210618193610595.png)



Okey let's go back to the gatsby cloud, after you select your repository, you have to set env variables. This variables are this same as in the your local files. Just fill it up.

## Integration with prismic, and auto rebuild

I think you would get a new content whenever only you create that! So right now go to the your gatsby **site** settings and in the general tab go to the **Builds Webhook:** copy this URL ![image-20210618194228876](https://github.com/newadbie/PTU-Gatsby-Project/blob/master/image-20210618194228876.png)

Go back to the Prismic settings, right now select and select webhooks. ![image-20210618194332087](https://github.com/newadbie/PTU-Gatsby-Project/blob/master/image-20210618194332087.png)

Right here paste your webhook, give it a name, and a secret if you set it before. 

Now select the **"Previews":** tab in the prismic 

![image-20210618194425179](https://github.com/newadbie/PTU-Gatsby-Project/blob/master/image-20210618194425179.png)

Here you have to paste your domain, it also work with localhost.

### Okey fine! Everything should work correct, but the protrainup doesn't give us information about changes...

We have to create our own cron scheduler, create your profile on this site https://cron-job.org/en/members/ and create a cron like this... ![image-20210618194758432](https://github.com/newadbie/PTU-Gatsby-Project/blob/master/image-20210618194758432.png)

### Finish

Okey, i think it is all. Thanks all for attention, and i hope i could help you and you appreciate my work ^_^ 
I will not develop too much this project, i don't have a lot of time for it. 

If you found any issues just report me it