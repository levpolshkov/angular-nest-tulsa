var app = db.getCollection('applications').findOne({})

function getPageIdFromPageName(app,pageName) {
    var section = app.sections.find(s => s.pages.find(p => p.name===pageName));
    if(!section) return;
    var page = section.pages.find(p => p.name===pageName);
    if(!page) return;
    return page._id;
}

app.sections.map(section => {
    return section.pages.map(page => {
        if(page.nextPageName) {
            var pageId = getPageIdFromPageName(app, page.nextPageName);
            if(pageId) page.nextPageId = pageId;
        }
        page.questions.forEach(question => {
            if(!question.options || !question.options.length) return;
            question.options.forEach(option => {
                if(!option.nextPageName) return;
                var pageId = getPageIdFromPageName(app, option.nextPageName);
                if(pageId) option.nextPageId = pageId;
            });
        });
    });
});

db.applications.save(app);