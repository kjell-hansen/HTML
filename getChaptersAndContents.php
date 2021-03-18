<?php

declare (strict_types=1);

if (isset($_GET['kapitel']) && $_GET['kapitel'] !== "") {
    $files = [];
    $filer=scandir($_GET['kapitel']);
    natsort($filer);
    foreach ($filer as $filnamn) {
        $path_parts = pathinfo("$_GET[kapitel]/$filnamn");
        if (is_file("$_GET[kapitel]/$filnamn") && $path_parts['extension'] === 'html') {
            $rubrik = getTitle("$_GET[kapitel]/$filnamn") ?? $filnamn;
            $fil=new stdClass();
            $fil->fil=$filnamn;
            $fil->rubrik=$rubrik;
            $files[] = $fil;
        }
    }
    $out = new stdClass();
    $out->filer = $files;
    echo json_encode($out);
} else {
    $chapters = [];
    foreach (scandir('./') as $chapter) {
        if (is_dir($chapter) && substr($chapter, 0, 1) !== ".") {
            $chapters[] = $chapter;
        }
    }
    $out = new stdClass();
    $out->kapitel = $chapters;
    echo json_encode($out);
}

function getTitle(string $fil): ?string {
    $doc = file_get_contents($fil);
    $pattern="/<title>(.*?)<\/title>/si";
    preg_match($pattern, $doc,$title);
    if ($title) {
    return $title[1];
    } else {
        return null;
    }
}
