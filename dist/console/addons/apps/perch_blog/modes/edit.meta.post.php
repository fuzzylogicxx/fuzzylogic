<?php

    echo $HTML->title_panel([
            'heading' => $Lang->get('Editing Post ‘%s’', $HTML->encode($Post->postTitle())),
            ], $CurrentUser);

    $smartbar_selection = 'meta';
    include(__DIR__.'/_post_smartbar.php');

    $template_help_html = $Template->find_help();
    if ($template_help_html) {
        echo $HTML->heading2('Help');
        echo '<div class="template-help">' . $template_help_html . '</div>';
    }

    /* ---- FORM ---- */
    echo $Form->form_start('blog-edit', 'magnetic-save-bar');


        /* ---- FIELDS FROM TEMPLATE ---- */
        $modified_details = $details;
        #PerchUtil::debug($modified_details);

        if (isset($modified_details['postDescRaw'])) {
            $modified_details['postDescHTML'] = $modified_details['postDescRaw'];
        }

        if (!isset($modified_details['og_title'])) {
            $modified_details['og_title'] = $modified_details['postTitle'];
        }

        if (!isset($modified_details['og_description']) && isset($modified_details['excerpt']['raw'])) {
            $modified_details['og_description'] = $modified_details['excerpt']['raw'];
        }

        echo $Form->fields_from_template($Template, $modified_details);

        echo $HTML->heading2('Meta data');

        /* ---- TAGS ---- */
        echo $Form->hint('Separate with commas');
        echo $Form->text_field('postTags', 'Tags', isset($details['postTags'])?$details['postTags']:false);


        /* ---- COMMENTS ---- */
        if ($CurrentUser->has_priv('perch_blog.comments.enable')) {
            echo $Form->checkbox_field('postAllowComments', 'Allow comments', '1', isset($details['postAllowComments'])?$details['postAllowComments']:'1');
        }


        /* ---- POST TEMPLATES} ---- */
        if (PerchUtil::count($post_templates)) {
            $opts = array();
            $opts[] = array('label'=>$Lang->get('Default'), 'value'=>'post.html');

            foreach($post_templates as $template) {
                $opts[] = array('label'=>PerchUtil::filename($template, false), 'value'=>'posts/'.$template);
            }
            echo $Form->hint('See sidebar note about post types');
            echo $Form->select_field('postTemplate', 'Post type', $opts, isset($details['postTemplate'])?$details['postTemplate']:'post.html');

        }else{
            echo $Form->hidden('postTemplate', isset($details['postTemplate'])?$details['postTemplate']:'post.html');
        }


        /* ---- AUTHORS ---- */
        $authors = $Authors->all();
        if (PerchUtil::count($authors)) {

            $opts = array();
            foreach($authors as $author) {
                $opts[] = array('label'=>$author->authorGivenName().' '.$author->authorFamilyName(), 'value'=>$author->id());
            }
            echo $Form->select_field('authorID', 'Author', $opts, (isset($details['authorID']) && $details['authorID']>0)?$details['authorID']:$Author->id());
        }

        /* ---- SECTIONS ---- */
        if (PerchUtil::count($sections)) {
            $opts = array();
            foreach($sections as $section) {
                $opts[] = array('label'=>$section->sectionTitle(), 'value'=>$section->id());
            }
            echo $Form->select_field('sectionID', 'Section', $opts, isset($details['sectionID'])?$details['sectionID']:1);
        }

        echo $Form->submit_field('btnSubmit', 'Save', $API->app_path());

    echo $Form->form_end();
    /* ---- /FORM ---- */