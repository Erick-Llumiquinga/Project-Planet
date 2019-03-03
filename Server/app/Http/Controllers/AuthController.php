<?php
    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use Validator;
    use Exception;
    use App\User;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\DB;
    use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
    use Illuminate\Database\Eloquent\ModelNotFoundException;

    class AuthController extends Controller{
        function register(Request $request){
            try{
                DB::beginTransaction();
                $data = $request->json()->all();
                $user = User::create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'pass' => $data['pass']
                ]);
                DB::commit(); 
            }
            catch(Exception $e){
                return $response()->json($e,400);
            }
            return response()->json($user,201);
        }
    }
?>