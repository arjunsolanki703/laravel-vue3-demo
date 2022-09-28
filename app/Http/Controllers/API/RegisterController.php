<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class RegisterController extends BaseController
{
    /**
     * Registration Req
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'firstname'   => 'required',
            'lastname'    => 'required',
            'dateofbirth' => 'required',
        ]);
        
        $data = $request->all();
        $record = User::create($data);

        $get_data = User::all();

        return response()->json(['status' => 'success','data'=>$get_data], 200);
    }

    public function checkValidationregister(Request $request)
    {
        $this->validate($request, [
            'firstname'   => 'required',
            'lastname'    => 'required',
        ]);
        
        return response()->json(['status' => 'success'], 200);
    }

}
