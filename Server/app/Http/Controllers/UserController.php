<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller
{
    function getUser(Request $request)
    {
        try{
            DB::beginTransaction();
            $data = $request->json()-all();
            $users = User::all([
                'name' => $data['name'],
                'email' => $data['email']
            ]);
            DB::commit;
        }
        catch(Exception $e){
            return response()->json($e,400);
        }
        return response()->json($e,200);
    }
}
