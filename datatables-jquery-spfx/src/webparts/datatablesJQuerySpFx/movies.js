$(document).ready(function() {
    table = $('#data').DataTable({
        ajax: {
            url: 'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json',
            // If an array of objects dataSrc: '' is what you should use.
            dataSrc: ''
        },
        order: [1, 'desc'],
        columns: [
            { data: 'title' },
            { data: 'year' },
            { data: 'cast' },
            { data: 'genres' },
            
        ]
    });
}());
