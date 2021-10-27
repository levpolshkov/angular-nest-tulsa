var app = db.getCollection('applications').findOne({});

app.sections.map((section,sectionIndex) => {
	section.order = sectionIndex+1;
    return section.pages.map((page,pageIndex) => {
		if(!page.type) page.type = 'question';
        page.order = pageIndex+1;
		page.questions.forEach((question,questionIndex) => {
			question.order = questionIndex+1;
		});
    });
});

db.applications.save(app);