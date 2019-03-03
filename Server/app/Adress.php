<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Adress extends Model 
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'companyName',
        'latitude',
        'length',
        'description',
        'contacts',
        'link'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
    ];
}
